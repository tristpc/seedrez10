//Gitpod version now PC
const _ = require('lodash')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  let allRegions = []
  let allTags = []

  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___contentClass], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                contentClass
              }
              frontmatter {
                contentClass
                title
                template
                tags
                meeting
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create pages
    const mdFiles = result.data.allMdx.edges

    // const contentTypes = _.groupBy(mdFiles, 'node.fields.contentClass')
    // console.log("JS length="+Object.keys(contentTypes).length);
    // console.log("Lodash length="+_.size(contentTypes));

    //define subset of tour pages for section contentClass === "tour"
    let tourPages = _.map(mdFiles, function(o) {
          if (o.node.fields.contentClass == "tour") return o;
    });     
    // Remove undefines from the array
    tourPages = _.without(tourPages, undefined)

    //OLDER CODE 

    mdFiles.forEach((post, index) => {
      const previous = index === mdFiles.length - 1 ? null : mdFiles[index + 1].node
      const next = index === 0 ? null : mdFiles[index - 1].node

      let template = post.node.frontmatter.template
      let contentClass = post.node.frontmatter.contentClass

      if (template) {
        template = template
      } else {
        template = "blog-post"
      }

      //console.log("index="+index+";template="+template)

      if (contentClass === "tour") {
            console.log(`${contentClass}: ${post.node.fields.slug}`)
        } 
        else {
            console.log(`${contentClass}: ${post.node.fields.slug}`)
        }

      createPage({
        //path: `blog${post.node.fields.slug}`,
        path: `${post.node.fields.slug}`,
        component: path.resolve(`src/templates/${String(template)}.js`),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

    }) //END mdFiles.forEach


    //* SECTION FOR TOURS => DEFINITIONS OF REGIONS & TAGS   

    console.log(`\nCREATING REGION & TAG ARRAYS FOR COUNTRY`)

    //* create array allRegions of regions
    
    // Iterate through each post, putting all found meeting into `allRegions`
    _.each(tourPages, edge => {
        if (_.get(edge, "node.frontmatter.meeting")) {
        allRegions = allRegions.concat(edge.node.frontmatter.meeting)
        }
    })
    // Eliminate duplicates
    allRegions = _.uniq(allRegions)
    //* end new regions

    console.log(`allRegions:-`)
    console.log(allRegions)

    //* define all tags
    // Iterate through each post, putting all found tags into `allTags`
    _.each(tourPages, edge => {
        if (_.get(edge, "node.frontmatter.tags")) {
        allTags = allTags.concat(edge.node.frontmatter.tags)
        }
    })
    // Eliminate duplicates
    allTags = _.uniq(allTags)
    //* end new tags

    console.log(`All tags for country (allTags):-`)
    console.log(allTags)
    //* END SECTION FOR TOURS DEFS


    //* SECTION FOR CREATING TOURS PAGES
      console.log(`\nCREATING TOURS LISTING PAGES`)

    //   console.log(`allRegions (from above):-`)
    //   console.log(allRegions)

      //* for each region, define tours for each tag, tags (allTagsRegion) & tour count
      allRegions.forEach(element => { //element = region
        let mdFilesRegion
        if (element) {
          mdFilesRegion = tourPages.filter(post =>post.node.frontmatter.meeting === element)
          //console.log("\n"+element+":-");
        } else {
          mdFilesRegion = tourPages
          //console.log("\nAll country:-");
        }
        let countToursRegion = mdFilesRegion.length
        //console.log(`# tours in $element: $countToursRegion`);
        console.log("# tours in "+element+": "+countToursRegion)

        //* define tags for region (allTagsRegion)
        let allTagsRegion = []
        // Iterate through each post, putting all found tags into `allTagsRegion`
        _.each(mdFilesRegion, edge => {
          if (_.get(edge, "node.frontmatter.tags")) {
            allTagsRegion = allTagsRegion.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicates
        allTagsRegion = _.uniq(allTagsRegion)
        //* end new tags

        console.log("Distinct tags for region "+element+":-")
        console.log(allTagsRegion)
        //id = idTourIndex
        //templateSlug = element

        //* for each region & tag, define slug & create page
        allTagsRegion.forEach(item => { //item = tag
          if (element) {
            thisSlug = "/"+element.toLowerCase()+"/"+item.toLowerCase()+"/"
          } else {
            thisSlug = "/tours/"+item.toLowerCase()+"/"
          }
        //   template = "TourList" // orig
        //   template = "TourListIndx" //prev
          template = "ToursIndxTours" //now
          console.log("Page: slug: "+thisSlug+" ("+element+"/ tag "+item+")")
          createPage({
            path: thisSlug,
            component: path.resolve(`src/templates/${String(template)}.js`),
            context: {
              place: element,
              tag: item,
              tagsRegion: allTagsRegion.toString(),
              allRegions: allRegions.toString(),
            //   tagFull: 'in: ["'+item+'"]',
            //   tagT: 'in',
            //   tagM: '["'+item+'"]',
            //   filter: 'filter: {frontmatter: {tags: { in: ["'+item+'"] } meeting: { eq: "'+element+'" } }}',
            }
          })
        });

        //* for each region alone, define slug & create page
        template = "TourListRegion" //removes tag from graphql
        //was ToursIndexPage4reg, which uses MUI
        thisSlug = "/"+element.toLowerCase()+"/"
        //thisSlug = "/"+_.kebabCase(element)+"/"
        console.log("slug = "+thisSlug)
      //   createPage({
      //     path: thisSlug,
      //     component: path.resolve(`src/templates/${String(template)}.js`),
      //     context: {
      //       place: element,
      //       tag: '',
      //       tagsRegion: allTagsRegion.toString(),
      //       allRegions: allRegions.toString(),
      //     }
      //   })

      }); //end allRegions.forEach

    //   console.log(`All tags for country (allTags) from above:-`)
    //   console.log(allTags)

      //* for all tours in country, define slug & create page
      template = "TourListAll" //removes tag from graphql
      thisSlug = "/all/"
      //console.log("slug = "+thisSlug)
      // createPage({
      //   path: thisSlug,
      //   component: path.resolve(`src/templates/${String(template)}.js`),
      //   context: {
      //     place: '',
      //     tag: '',
      //     tagsRegion: allTags.toString(),
      //     allRegions: allRegions.toString(),
      //   }
      // })

      //* NEW for each tag for whole country, define slug & create page
      allTags.forEach(item => { //item = tag
        thisSlug = "/all/"+item.toLowerCase()+"/"
        template = "TourListTag" //
        //console.log("slug = "+thisSlug);
      //   createPage({
      //     path: thisSlug,
      //     component: path.resolve(`src/templates/${String(template)}.js`),
      //     context: {
      //       place: '',
      //       tag: item,
      //       tagsRegion: allTags.toString(),
      //       allRegions: allRegions.toString(),
      //     }
      //   })
      }); 
      //* END SECTION FOR CREATING TOURS PAGES

    //} 

    return null
  }) //END .then(result
} //END exports.createPages

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  //console.log("node.internal.type = "+node.internal.type)

  if (node.internal.type === `Mdx`) {

    // Create smart slugs
    // https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-node.js
    let slug
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (_.get(node, 'frontmatter.slug')) {
    slug = `/${node.frontmatter.slug.toLowerCase()}/`
    } else if (
    // home page gets root slug
    parsedFilePath.name === 'index' &&
    parsedFilePath.dir === 'pages'
    ) {
    slug = `/`
    } else if (
    // places page gets posts slug
    parsedFilePath.name === 'places' &&
    parsedFilePath.dir === 'pages'
    ) {
    slug = `/posts/`
    } else if (
    // tours page gets tours slug
    parsedFilePath.name === 'tours' &&
    parsedFilePath.dir === 'pages'
    ) {
    slug = `/tours/`
    } else if (_.get(node, 'frontmatter.title')) {
    slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
        node.frontmatter.title)}/`
    } else if (parsedFilePath.dir === '') {
    slug = `/${parsedFilePath.name}/`
    } else {
    slug = `/${parsedFilePath.dir}/`
    }

    if (parsedFilePath.dir !== 'tours') {
    console.log(`\nparsedFilePath.name = ${parsedFilePath.name}`)
    console.log(`parsedFilePath.dir = ${parsedFilePath.dir}`)
    console.log(`slug = ${slug}`)
    }

    //const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      //value,
      value: slug,
    })

    // Add contentClass to node.fields
    createNodeField({
      name: 'contentClass',
      node,
      value: node.frontmatter.contentClass,
    })
  }
}

// Implement the Gatsby API “onCreatePage”. This is called after every page is created.
//see https://www.gatsbyjs.org/docs/gatsby-internals-terminology/#matchpath
exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  //const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }
}
