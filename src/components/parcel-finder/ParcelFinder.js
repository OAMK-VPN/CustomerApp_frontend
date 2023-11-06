import React from "react"
import "./ParcelFinder.css"


const ParcelFinder = () => {
 const findAParcel = () => { }

  return (
    <div className="parcel-finder-container">
      <div>
        <p>Find your parcel</p>
        <input
          placeholder="Parcel id"
        />
        <button onClick={findAParcel}>Find</button>
      </div>
    </div>
  )
}

export default ParcelFinder