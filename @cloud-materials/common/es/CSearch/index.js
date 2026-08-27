import CSearch from './CSearch';
import CSimpleSearch from './CSimpleSearch';
import CCascaderSearch from './CCascaderSearch';
import CCombineSearch from './CCombineSearch';
var CSearchElement = CSearch;
CSearchElement.CSimpleSearch = CSimpleSearch;
CSearchElement.CCascaderSearch = CCascaderSearch;
CSearchElement.CCombineSearch = CCombineSearch;
export { useCSearch, useCCascaderSearch, useCCombineSearch } from './hooks';
export { CSimpleSearch, CCascaderSearch, CCombineSearch };
export default CSearchElement;
//# sourceMappingURL=index.js.map