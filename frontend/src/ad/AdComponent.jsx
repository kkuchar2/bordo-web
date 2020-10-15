import React from 'react';

class AdComponent extends React.Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <ins className='adsbygoogle'
                 style={{ display: 'block' }}
                 data-ad-client='ca-pub-6696479036299153'
                 data-ad-slot='12121212'
                 data-ad-format='auto' />
        );
    }
}