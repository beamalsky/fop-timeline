import React, { Component } from 'react'
import { graphql } from 'gatsby'
import scrollama from 'scrollama'
import Img from "gatsby-image"

import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/footer'
import '../css/typekit.css'
import '../css/custom.css'

const config = {
    showMarkers: true,
    theme: 'light',
    alignment: 'center',
    title: 'FOP Timeline',
    subtitle: 'TKTKTKTK',
    image: '/card.png'
}

const alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChapter: props.chapters[0]
    };
  }

  componentDidMount() {
      const scroller = scrollama()
      window.addEventListener('resize', scroller.resize)
    }

    render() {
      const config = this.props
      const chapters = config.chapters
      const theme = config.theme
      const currentChapterID = this.state.currentChapter.id
      return (
        <div>
          <div />
          <Header
            config={config}
          />
          <div id="story" style={{backgroundColor: 'black'}}>
              {
                chapters.map(chapter =>
                  <Chapter key={chapter.id} theme={theme} {...chapter} currentChapterID={currentChapterID}/>
                )
              }
          </div>
          <Footer>
            <p className="footer">
              <a href="">Footer content goes here</a>
            </p>
          </Footer>
        </div>
      )
    }
}

function Chapter({id, theme, full_width_image, title, image, description, media_embed, timestamp, currentChapterID}) {
    const classList = id === currentChapterID ? "step active" : "step";
    if (full_width_image) {
      return (
        <Img
          fluid={full_width_image.localFiles[0].childImageSharp.fluid}
        />
      )
    } else {
      return (
        <div
          id="features"
          className={alignments[config.alignment]}
          style={{
            paddingTop: '4vh',
            paddingBottom: '4vh'
        }}>
          <div
            id={id}
            className={classList}
            style={{
              paddingTop: '17vh',
              paddingBottom: '17vh',
              opacity: 1
          }}>
              <div className={theme} style={{padding: '35px 40px'}}>
                  { image &&
                    <Img
                      fluid={image.localFiles[0].childImageSharp.fluid}
                      className="mb-5"
                    />
                  }
                  { timestamp &&
                    <p className='byline'><b>{timestamp}</b></p>
                  }
                  { title &&
                      <h3 className="dek mt-3 mb-3">{title}</h3>
                  }
                  { description &&
                      <div
                        dangerouslySetInnerHTML={{ __html: description }}
                        style={{
                          padding: '0'
                        }}
                      />
                  }
                  {
                    media_embed &&
                    <div
                      dangerouslySetInnerHTML={{ __html: media_embed }}
                      style={{
                        padding: '0'
                      }}
                    />
                  }
              </div>
          </div>
        </div>
      )
    }
}

const IndexPage = ({data}) => {
  config.chapters = []
  data.allAirtable.nodes.forEach(record => {
    const chapter = {
      'id': `chapter-${record.data.id}`,
      'full_width_image': record.data.full_width_image,
      'title': record.data.title,
      'image': record.data.image,
      'description': record.data.description ? record.data.description.childMarkdownRemark.html : null,
      'media_embed': record.data.media_embed,
      'timestamp': record.data.timestamp
    }
    config.chapters.push(chapter)
  })

  return (
    <>
      <SEO
        title={config.title}
        description={config.subtitle}
        image={config.image}
      />
      <Index {...config}/>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query FOPTimelineQuery {
    allAirtable(
      sort: {fields: data___id, order: ASC},
      filter: {
        table: { eq: "FOP Timeline" }
      }
    ) {
      nodes {
        data {
          id
          full_width_image {
            localFiles {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  src
                  tracedSVG
                  srcWebp
                  srcSetWebp
                  srcSet
                  sizes
                  presentationWidth
                  presentationHeight
                  originalName
                  originalImg
                  base64
                  aspectRatio
                }
              }
            }
          }
          title
          image {
            localFiles {
              childImageSharp {
                fluid(maxWidth: 800) {
                  src
                  tracedSVG
                  srcWebp
                  srcSetWebp
                  srcSet
                  sizes
                  presentationWidth
                  presentationHeight
                  originalName
                  originalImg
                  base64
                  aspectRatio
                }
              }
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          media_embed
          timestamp
        }
      }
    }
  }
`
