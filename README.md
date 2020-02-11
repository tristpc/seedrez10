# To do:-
- need 4 versions of template? error variable "$filter" of type "MdxFrontmatterFilterInput" used in position expecting type "MdxFilterInput"
- search => more fields
- filters = sidebar
- tags + categories?
- Netlify CMS
- each tour format

Error when using:-
query($filter: MdxFrontmatterFilterInput) {
    
    posts: allMdx(
        filter: $filter
        sort: { order: ASC, fields: [frontmatter___price_from] }
    )
    
error  Variable "$filter" of type "MdxFrontmatterFilterInput" used in position expecting type "MdxFilterInput" 

with query($filter: MdxFilterInput):-
Variable "$filter" got invalid value "filter: {frontmatter: {tags: { in: [\"Adventure\"] } meeting: { eq: \"Central Pacific\" } }}"; Expected type MdxFilterInput to be an object.

When filter adjusted in GN:-
Variable "$filter" got invalid value "{frontmatter: {tags: { in: [\"Adventure\"] } meeting: { eq: \"Central Pacific\" } }}"; Expected type MdxFilterInput to be an object.

Then when using again MdxFrontmatterFilterInput:-
Variable "$filter" of type "MdxFrontmatterFilterInput" used in position expecting type "MdxFilterInput".

# 11 Feb
Change ToursIndxTours.js to ToursList.js, add filter & get Sidebar & search working.
Convert PostSection to TourSection with TourCard etc. Add price_from

# 10Feb
Save ToursIndx as ToursIndxTours, add filter below with page context:-
filter: {frontmatter: {tags: { in: [$tag] } meeting: { eq: $place } }}

# While changing name of TourList as template in gatsby-node:-
* TourListIndx: based on ToursIndx. g-node changed to add slug to page context. Gives error
* Comment out page create of TourListIndx. Proven page context gets passed to page in GraphQL as $slug, by changing all to $slugg.

- next: add slug, and other page context for tour listings

# While using TourList as template in gatsby-node:-
TourListLASTGitpod-7feb.js: last one seemingly working in GP. Based on orig TourList. All cards empty
TourListLASTNW: failed so then adjusted orig TourList
TourList: based on orig TourList. looks good but all cards empty
TourListLASTNW-ToursIndx added: as TourList but with ToursIndx. Failed re tag.
