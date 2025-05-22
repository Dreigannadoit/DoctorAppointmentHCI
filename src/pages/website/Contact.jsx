import React, { useState } from 'react'
import WebWrapper from '../../components/website/WebWrapper'

import "../../styles/Contact.css"
import { abby, drei, hann, ken } from '../../assets'

const creatorList = {
    name: "ROBERT ANDREI N. BAMBA",
    title: "DEVELOPER",
    img: drei
}

const Contact = () => {
    return (
        <WebWrapper>
            <section className='contact'>
                <div className="tag">
                    <p>Creator</p>
                </div>
                <br />

                <div className="member_wrapper">
                    <div className="member_card">
                        <div className="img_wrapper">
                            <img src={creatorList.img} alt="" />
                        </div>

                        <p><b>{creatorList.name}</b></p>
                        
                        <p>{creatorList.title}</p>
                    </div>
                </div>
            </section>

        </WebWrapper>
    )
}

export default Contact