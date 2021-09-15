import React from 'react'
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  LinkedinShareButton, LinkedinIcon,
  RedditShareButton, RedditIcon,
} from "react-share";

const ShareModal = ({url, theme}) => {
  return (
    <div className="d-flex justify-content-between px-5 py-2 share_modal"
    style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32}/>
      </FacebookShareButton>
      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32}/>
      </EmailShareButton>
      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32}/>
      </RedditShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32}/>
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon round={true} size={32}/>
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32}/>
      </WhatsappShareButton>
    </div>
  )
}

export default ShareModal
