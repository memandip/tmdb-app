import React from 'react'
import PropTypes from 'prop-types'

export const Loading = ({ text }) => (
    <div className='loading' style={{
        position: 'fixed',
        top: '50%',
        left: '50%'
    }}>
        {text}
    </div>
)

Loading.propTypes = {
    text: PropTypes.string.isRequired
}

Loading.defaultProps = {
    text: 'loading ....'
}