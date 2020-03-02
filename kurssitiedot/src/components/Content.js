import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(a => (
                <Part part={a} key={a.id} />
            ))}
        </>
    )
}

export default Content
