import React from 'react'

const RightSideBar = () => {
  return (
    <div>
      <div className="right_side_bar mt-3">
        <section className="card_content">
          <div className="card_header">
            <h5 className="text-black my-3 ml-3">Listings</h5>
            <span className="mr-3">See all</span>
          </div>
          <ul>
            <li className="card_item">
              <a href="/">The Future of HTML Controls - Free Session - Sep 23, 1pm ET (GMT -4)</a>
              <span>events</span>
            </li>
            <li className="card_item">
              <a href="/">❗ ATTENTION ❗ DevTernity is coming!.</a>
              <span>events</span>
            </li>
            <li className="card_item">
              <a href="/">CSSBattle 15 has begun! ⚔️</a>
              <span>events</span>
            </li>
            <li className="card_item">
              <a href="/">Senior Software Engineer, Data // REMOTE // Verb Data</a>
              <span>events</span>
            </li>
          </ul>
          <div className="card_footer">
            <span> Create a Listing</span>
          </div>
        </section>
        <section className="card_content my-4">
          <div className="card_header">
            <h5 className="text-black my-3 ml-3">#news</h5>
          </div>
          <ul>
            <li className="card_item">
              <a href="/">Save your application from crashing by wrong use of Web Storage API or localStorage in browser</a>
              <span>2 comments</span>
            </li>
            <li className="card_item">
              <a href="/">This week in React #21</a>
              <span className="label my-1">New</span>
            </li>
          </ul>
        </section>
        <section className="card_content my-4">
          <div className="card_header">
            <h5 className="text-black my-3 ml-3">#discuss</h5>
          </div>
          <ul>
            <li className="card_item">
              <a href="/">Should I use SQLite, PostgreSQL, or MySQL?</a>
              <span className="label my-1">New</span>
            </li>
            <li className="card_item">
              <a href="/">What do you use for CI/CD ?</a>
              <span>2 comments</span>
            </li>
            <li className="card_item">
              <a href="/">Has OneDrive PWA been made using Blazor?</a>
              <span className="label my-1">New</span>
            </li>
            <li className="card_item">
              <a href="/">What do you use for CI/CD ?</a>
              <span>2 comments</span>
            </li>
            <li className="card_item">
              <a href="/">What do you use for CI/CD ?</a>
              <span>2 comments</span>
            </li>
            <li className="card_item">
              <a href="/">What do you use for CI/CD ?</a>
              <span>2 comments</span>
            </li>
          </ul>
        </section>
      </div>

     
    </div>
  )
}

export default RightSideBar
