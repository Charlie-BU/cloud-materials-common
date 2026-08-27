import CSearch from './CSearch';
import CSimpleSearch from './CSimpleSearch';
import CCascaderSearch from './CCascaderSearch';
import CCombineSearch from './CCombineSearch';
type RefCSearch = typeof CSearch;
interface RefCSearchElement extends RefCSearch {
    CSimpleSearch: typeof CSimpleSearch;
    CCascaderSearch: typeof CCascaderSearch;
    CCombineSearch: typeof CCombineSearch;
}
declare const CSearchElement: RefCSearchElement;
export { useCSearch, useCCascaderSearch, useCCombineSearch } from './hooks';
export { CSimpleSearch, CCascaderSearch, CCombineSearch };
export default CSearchElement;
