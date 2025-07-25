import React, { useState } from 'react'
import WebWrapper from '../../components/website/WebWrapper'

import "../../styles/Contact.css"
import { abby, drei, hann, ken } from '../../assets'

// const creatorList = {
//     name: "ROBERT ANDREI N. BAMBA",
//     title: "DEVELOPER",
//     img: drei
// }

// const Contact = () => {
//     return (
//         <WebWrapper>
//             <section className='contact'>
//                 <div className="tag">
//                     <p>Creator</p>
//                 </div>
//                 <br />

//                 <div className="member_wrapper">
//                     <div className="member_card">
//                         <div className="img_wrapper">
//                             <img src={creatorList.img} alt="" />
//                         </div>

//                         <p><b>{creatorList.name}</b></p>
                        
//                         <p>{creatorList.title}</p>
//                     </div>
//                 </div>
//             </section>

//         </WebWrapper>
//     )
// }


const creatorList = [
    {
        name: "ROBERT ANDREI N. BAMBA",
        title: "DEVELOPER",
        img: drei
    },
    // {
    //     name: "SHIFRA ABIGAIL B. GARCIA",
    //     title: "DESIGNER",
    //     img: abby
    // },
    // {
    //     name: "HANNAH A. HONTIVEROS",
    //     title: "DEVELOPER",
    //     img: hann
    // },
    // {
    //     name: "KEN A. MADRIÑAN",
    //     title: "DESIGNER",
    //     img: ken
    // },
]


const Contact = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <WebWrapper>
            <section className='contact'>
                <h1>The Creators</h1>
                <br />
                <p>Hello Sir. Johnny, if you are reading this, then our presentation has ended.</p>
                <br />
                <p>Thank You For Listining.</p>
            </section>

            <section className='members'>
                <div className="tag">
                    <p>Creator</p>
                </div>

                <br />

                <div className="wrapper_content">

                    {creatorList.map((card, index) => (
                        <div
                            className={`person ${hoveredIndex === index ? 'active' : ''}`}
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="text">
                                <h1>{card.name}</h1>
                                <p> <i>{card.title}</i> </p>
                            </div>
                            <img src={card.img} alt="" />
                        </div>
                    ))}





                </div>
            </section>

        </WebWrapper>
    )
}

export default Contact