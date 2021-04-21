import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Col, Row } from 'react-bootstrap'

import HeroImage from './heroimage'

const Header = ({config}) => (
  <StaticQuery
    query={
      graphql`
        query HeaderQuery {
          header: file(relativePath: { eq: "july-17-header.png" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `
    }
    render={data => (
      <>
        <Row>
          <Col xs={12} md={6} style={{padding: 0}}>
            <HeroImage
              fluid={data.header.childImageSharp.fluid}
            />
          </Col>
          <Col xs={12} md={6} style={{padding: 0}}>
            <div
              style={{
              padding: '4.25rem',
              textAlign: 'left',
              backgroundColor: 'white'
            }}
            className="main-text-column">
                <h1
                  style={{color: 'black', fontSize: '3.7rem'}}
                >
                    {config.title}
                </h1>
                <h3 className="dek">{config.subtitle}</h3>
                <p className='byline' style={{color: '#696969'}}>By TKTKTKT<br />Web interactive by Bea Malsky</p>
                <p className='subbyline' style={{color: '#696969'}}>Cover photo by TKTKTKTK</p>
            </div>
          </Col>
        </Row>

        <div id="intro" style={{
          backgroundColor: 'white',
          padding: '2rem',
          opacity: '95%'
        }}>
          <Row>
            <Col className="main-text-column" xs={12} md={7}>
              <p>
                <span className="dropcap">L</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium ante vitae metus egestas, ac egestas risus viverra. Phasellus eu augue dapibus, posuere velit sit amet, convallis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque tempor urna et felis tincidunt, ac cursus elit tempus. Vestibulum convallis leo sit amet risus posuere, non hendrerit tortor tempus. 
              </p>
              <p>
                Etiam erat leo, varius faucibus hendrerit a, sodales vel ante. In volutpat est lobortis est euismod sollicitudin. Fusce malesuada ex vitae vulputate pulvinar. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis justo metus, accumsan iaculis sagittis quis, commodo a tellus. In turpis urna, facilisis quis ultricies eget, elementum dignissim justo. Nunc lacinia nunc mi, a vehicula metus efficitur eget. Quisque aliquet semper odio a sollicitudin. Phasellus feugiat mattis ipsum. Suspendisse augue nulla, porta quis diam id, interdum semper enim.
              </p>
              <p>
                Donec at metus ut elit pellentesque aliquam. Proin eu massa sapien. Mauris pulvinar nunc risus, facilisis volutpat elit laoreet in. Suspendisse suscipit eleifend rhoncus. Aenean sit amet arcu eget mi egestas fermentum. Aliquam enim erat, viverra et maximus quis, facilisis a risus. Nulla facilisi. Praesent ac est a nisl interdum vulputate. Aliquam eu dignissim leo, nec tempor tellus. Nunc gravida nunc sed tincidunt malesuada. Mauris euismod, turpis a condimentum porta, sem dui elementum felis, volutpat elementum orci dui ut risus. Morbi interdum neque ac velit vehicula dapibus a in nisi.
              </p>
            </Col>
          </Row>
        </div>
      </>
    )
    }
  />
)

export default Header
