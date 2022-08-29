import React, { useState } from "react";
import { boroughs } from "./Boroughs";

export default function SelfServeEmbed() {
  const [borough, setBorough] = useState("Camden");
  return (
    <div style={{ padding: "32px" }}>
      <h1>Self-serve embeddable maps</h1>
      <h2>
        Embed a map of toilets in a particular London borough on your website
      </h2>
      <p>
        This service is provided particularly for London borough website
        managers who would like to embed a map of toilets in their borough
        somewhere on their website.
      </p>
      <h2>Make the most of Toilets4London</h2>
      <p>
        <a href="https://www.toilets4london.com/#contact">Get in touch with us today</a> if you would like to start managing toilet
        data directly on the Toilets4London admin platform to keep the map as up
        to date as possible.
      </p>
      <h2>How to embed the map</h2>
      <ol>
        <li>
          <p>
            <b>Choose borough</b>
          </p>

          <p>
            <select
              value={borough}
              onChange={(e) => {
                setBorough(e.target.value);
              }}
            >
              {boroughs.map((b) => {
                return <option value={b.value}>{b.display_name}</option>;
              })}
            </select>
          </p>
        </li>
        <li>
          <p>
            <b>
              Paste this code into the HTML for your site wherever you
              would like the map
            </b>
          </p>
          <p>
            <pre>
              <code>
                {`<iframe src="https://app.toilets4london.com/${borough.replaceAll(
                  " ",
                  "+"
                )}" title="${borough} toilet map" width="100%" height="600px"></iframe>`}
              </code>
            </pre>
          </p>
          <p>
            You can change the width and height of the map by changing the{" "}
            <pre style={{ display: "inline" }}>width=</pre> and{" "}
            <pre style={{ display: "inline" }}>height=</pre> values
          </p>
        </li>
      </ol>
    </div>
  );
}
