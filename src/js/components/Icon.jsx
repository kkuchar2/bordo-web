import React from 'react';

import "componentStyles/Icon.scss"

export default props => {
    return <div className={["icon", props.className].join(" ")}>
        <i className={"fa fa-sun-o"} aria-hidden={"true"}/>
    </div>
}