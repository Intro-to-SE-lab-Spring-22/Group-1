import './leftbar.css'
import {RssFeed} from "@material-ui/icons"

export default function leftbar() {
  return (
    <div className = "leftbar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
              <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Timeline Feed</span>
              </li>
            </ul>
            <hr className="sidebarHr" />
        </div>
    </div>
  )
}