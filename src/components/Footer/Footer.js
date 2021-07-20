import Twitter from "../Icons/Twitter"
import Instagram from "../Icons/Instagram"
import Facebook from "../Icons/Facebook"
import LinkedIn from "../Icons/Linkedin"
import YouTube from "../Icons/YouTube"
import american_express from "../../assets/american_express.svg"
// import app_store from "../../assets/app_store.svg"
// import google_play from "../../assets/google_play.svg"
import mastercard from "../../assets/mastercard.svg"
import paypal from "../../assets/paypal.svg"
import visa from "../../assets/visa.svg"
import { Link } from 'react-router-dom';
import "./Footer.css"

const socialsLookup = {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
}

const links = {
  Sitemap: [<Link to='/'>Home</Link>, <Link to='/forum'>Forum</Link>, <Link to='/contact-us'>Contact Us</Link>],
  Information: [<Link to='/meet-the-team'>Meet The Team</Link>, <Link to='contact-us/'>Contact Us</Link>, <Link to='/careers'>Careers</Link>],
  Account: [<Link to='/login'>Login</Link>, <Link to='/register'>Register</Link>, <Link to='/orders'>My Orders</Link>],
}

const LinkIcon = ({ title, link }) => {
  if (title !== "Socials") return null

  const Icon = socialsLookup[link] || null

  return <Icon fill="var(--muted)" />
}

const LinkColumn = ({ title, links }) => {
  return (
    <div className="link-column">
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <LinkIcon title={title} link={link} />
            {link}
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default function Footer() {
  return (
    <div className="Footer">
      <div className="content">
        {/* Top Section */}
        <div className="top">
          <div className="links">
            {/* Standard Links */}
            {Object.keys(links).map((columnTitle) => (
              <LinkColumn key={columnTitle} title={columnTitle} links={links[columnTitle]} />
            ))}
            {/* End of Links */}
          </div>
        </div>
        {/* Bottom Section */}
        <div className="bottom">
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} OUR COMPANY NAME | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
          <span className="payment-options">
            <img src={american_express} alt="american express" />
            <img src={mastercard} alt="mastercard" />
            <img src={paypal} alt="paypal" />
            <img src={visa} alt="visa" />
          </span>
        </div>
      </div>
    </div>
  )
}
