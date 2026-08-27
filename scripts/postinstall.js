const path = require('path');
const fs = require('fs');
const semver = require('semver');

const pkgJSONPath = path.join(process.env.INIT_CWD ?? __dirname, 'package.json');
const selfPkgJSON = require(path.join(__dirname, '../package.json'));
const json = require(pkgJSONPath);

const selfFormilyPkgs = Object.keys({ ...selfPkgJSON.devDependencies, ...selfPkgJSON.dependencies }).filter(name =>
  /^@formily\//.test(name),
);

// 用户安装的BP主题包版本
/** @type {string ｜ undefined} */
let selfBpThemePkgVersion = { ...json.devDependencies, ...json.dependencies }[
  '@arco-design/theme-byteplus-console-admin'
];

if (selfBpThemePkgVersion) {
  selfBpThemePkgVersion = selfBpThemePkgVersion.replace(/^(\^|~)/, '');
}

// 判断用户安装的BP主题包版本是否是具体的版本，如果是具体的版本，需要判断版本是否大于0.2.4；否则跳过检查
const isValidBpThemePkgVersion = selfBpThemePkgVersion && semver.valid(selfBpThemePkgVersion) !== null;

if (fs.existsSync(pkgJSONPath)) {
  if (!process.env.npm_config_cloud_materials_common_skip_validate) {
    if (json.name !== selfPkgJSON.name) {
      const { devDependencies, dependencies } = json;
      const formilyPkgs = Object.keys({ ...devDependencies, ...dependencies }).filter(packageName =>
        selfFormilyPkgs.includes(packageName),
      );

      if (formilyPkgs.length) {
        console.log();
        console.log(
          `\x1b[41m[${selfPkgJSON.name}]: ${formilyPkgs.join(
            ', ',
          )} 被禁止安装，原因是可能会导致 CForm 使用出现 bug，请卸载后使用「from '${
            selfPkgJSON.name
          }/formily/xxx'」代替\x1b[49m`,
        );
        console.log();
        process.exit(1);
      }

      // 要求用户安装 @arco-design/theme-byteplus-console-admin >= 0.2.4，否则BP环境会无法编译通过
      if (
        !process.env.npm_config_cloud_materials_common_skip_validate_bp_theme &&
        isValidBpThemePkgVersion &&
        semver.lt(selfBpThemePkgVersion, '0.2.4')
      ) {
        throw new Error(
          `@arco-design/theme-byteplus-console-admin 的版本过低，会导致 byteplus 环境 scm 编译失败，请升级该包的版本至 >=0.2.4`,
        );
      }
    }
  }
}

// 创建一个软链使用户能够使用这种方式引入arco的类型 import {} from '@cloud-materials/common/arco/es/Button/interface'
const symLinkPath = path.join(__dirname, '../arco');

if (!fs.existsSync(symLinkPath)) {
  try {
    fs.unlinkSync(symLinkPath);
  } catch (error) {}
  fs.symlinkSync(require.resolve('@arco-design/web-react/package.json').replace(/\/package\.json$/, ''), symLinkPath);
}
