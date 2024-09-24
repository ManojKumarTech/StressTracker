import React from 'react'

function Home() {
    function csk(){
        let a = 'TharkuriFans'
    }
    function rcb(){
        let b = 'LoyalFans'
    }
    return (
        <div>
            <h1>Choose  Your Team</h1>
            <button onClick={csk}>CSK</button>
            <button onClick={rcb}>RCB</button>
            
        </div>
    )
}

export default Home
