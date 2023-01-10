import React from 'react'

const Alert = (props) => {
    const {alert}= props;
  return (
    <div style={{hieght:'50px'}}>
       {props.alert &&  <div className={`alert alert-${ alert.type}`} role="alert">
  <h4 className="alert-heading">{alert.heading}!</h4>
  <p>{alert.message}</p>
  <hr/>
  <p className="mb-0">Thanks For Using iNotebook.</p>
</div> }
    </div>
  )
}

export default Alert