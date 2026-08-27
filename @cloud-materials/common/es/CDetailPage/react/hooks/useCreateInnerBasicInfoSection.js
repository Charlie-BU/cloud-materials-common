import { useMemo } from 'react';
import { InfoSectionList } from '../../core';
export var useCreateInnerBasicInfoSectionList = function (config) {
    var infoSectionList = useMemo(function () { return new InfoSectionList(config); }, []);
    return infoSectionList;
};
//# sourceMappingURL=useCreateInnerBasicInfoSection.js.map