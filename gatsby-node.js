const _ = require('lodash')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                contentClass
                title
                template
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

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      let template = post.node.frontmatter.template

      if (template) {
        template = template
      } else {
        template = "blog-post"
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
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

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

    // console.log(`\nparsedFilePath.name = ${parsedFilePath.name}`)
    // console.log(`parsedFilePath.dir = ${parsedFilePath.dir}`)
    // console.log(`slug = ${slug}`)
    // const value = createFilePath({ node, getNode })
    // console.log(`slug(value) = ${value}`)

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
