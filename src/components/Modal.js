const Modal = ({ handleClose, show, }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          
            <button className="modal_close_btn" type="button" onClick={handleClose}>
                <span className='close-btn' >×</span>
            </button>

        <div className="form-content">
            <div className="form-inputs">
                <label htmlFor="deal_name" className="form-label">Deal Name</label>
                <input type="text" 
                    name="username" 
                    className="form-input" 
                    placeholder="Enter Deal Name"
                    id="deal_name"/> 
            </div>

            <div className="form-inputs">
                <label htmlFor="customer_name" className="form-label">Customer Name</label>
                <input type="text" 
                    name="username" 
                    className="form-input" 
                    placeholder="Enter Customer Name"
                    id="customer_name"/> 
            </div>

            <div className="form-inputs">
                <label htmlFor="deal_value" className="form-label">Deal Value</label>
                <input type="text" 
                    name="deal_value" 
                    className="form-input" 
                    placeholder="Enter Deal Value"
                    id="deal_value"/> 
            </div>
            
            <button className="form-input-btn" type="submit">Create Deal</button>
        </div>

        

        </section>
      </div>
    );
  };

  export default Modal;