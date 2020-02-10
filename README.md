# To do Mon:-
1) Check Feb7 GP version to see if ToursIndx was run but not pushed to Github without postcats & pages in GraphQL. Remove all refs to postcats & pages. WORKS!!
1a) Change from $slug to $slugggg in SingleTour and add this as additional page context in main page creation of g-node. WORKS!! SingleTour.js able to extract page context.
2) Add tags & meeting to ToursIndx, then check GraphQL with this instead
filter: {frontmatter: {tags: { in: [$tag] } meeting: { eq: $place } }} =>
filter: {frontmatter: {tags: { in: ["Biking"] } meeting: { eq: "La Fortuna" } }}  WORKS!!!!!
3) Then in page context of GN for contentClass=tour:-  [see https://github.com/gatsbyjs/gatsby/issues/10698]
filter: { fields: { contentClass: { eq: "tour" } } }
and in ToursIndx try:-
filter: $filter  NOT DONE YET
4) Save ToursIndx as ToursIndxTours, adjust GN and add pagecontext and filter below:-
filter: {frontmatter: {tags: { in: ["Adventure"] } meeting: { eq: "La Fortuna" } }}  WORKS
5) Save ToursIndx as ToursIndxTours, add the sort and filter below as page contexts for TourList:-
sort: { "fields": ["publishDate"], "order": "DESC" }
sort: { fields: [frontmatter___price_from], order: ASC }
filter: {frontmatter: {tags: { in: [$tag] } meeting: { eq: $place } }}
and enter these in GraphQL of ToursIndx2
PROBLEM: ToursIndxTours references undefined variables XXXXXXX

# While changing name of TourList as template in gatsby-node:-
* TourListIndx: based on ToursIndx. g-node changed to add slug to page context. Gives error
* Comment out page create of TourListIndx. Proven page context gets passed to page in GraphQL as $slug, by changing all to $slugg.

- next: add slug, and other page context for tour listings

# While using TourList as template in gatsby-node:-
TourListLASTGitpod-7feb.js: last one seemingly working in GP. Based on orig TourList. All cards empty
TourListLASTNW: failed so then adjusted orig TourList
TourList: based on orig TourList. looks good but all cards empty
TourListLASTNW-ToursIndx added: as TourList but with ToursIndx. Failed re tag.

## 7Feb
ListPageHeader:-
<div className="container">
        <h2>{placeTitle}</h2>
        <DropMenuButton title="Filters" id="dropButton"/>
      </div>