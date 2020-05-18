import React, { useState } from "react";

const Confirm = (props) => {
  const [value, setValue] = useState(false);

  const onChange = () => {
    setValue(true);
    // window.sessionStorage.setItem("confirm", "true");
    localStorage.setItem("confirm", "true");
    window.location.reload();
  };

  return (
    <div className="confirm-container">
      <div tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-block">
              <h5 className="modal-title text-center">
                <i className="fa fa-lg fa-exclamation-triangle red"></i> You
                have to be over 18 to enter this site
              </h5>
            </div>
            <div className="modal-footer d-block text-center">
              <button type="button" className="btn btn-rose" onClick={onChange}>
                I'm over 18
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
