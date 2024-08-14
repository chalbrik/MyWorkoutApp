import React from "react";

function Header(props) {
  return (
    <header>
      <h1>MyWorkout</h1>
      <nav>
        {props.navItemsDisplay && (
          <ul>
            <li onClick={props.onLogout} style={{ cursor: "pointer" }}>
              Log out
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
