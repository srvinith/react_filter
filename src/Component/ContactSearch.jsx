import React, { useEffect, useMemo, useState } from 'react'
import { HiBellAlert } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import Records from './Records.json'
import { useSearch } from './SearchContext';
import { CgMenu } from 'react-icons/cg';





const ContactSearch = () => {
    const [dropdown, setdrobDown] = useState(false)
    const [searchTerm, setSearchTerm] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [newArray, setNewArray] = useState([]);
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [mobMenu,setMobMenu] =useState(false)

    const { saveSearchTerm } = useSearch();
    const items = [
        'C-Level',
        'VP-Level',
        'Director-Level',
        'Manager-Level',
        'Staff-Level',
        'B-Level',
    ]





    const handelSearch = (e) => {
        const searchValue = e.target.value
        setSearchTerm(searchValue)
        setLocalSearchTerm(searchValue);
        const searchTermsArray = JSON.parse(localStorage.getItem('searchTerms')) || [];
        searchTermsArray.push(searchValue);
        localStorage.setItem('searchTerms', JSON.stringify(searchTermsArray));
    }

    const handleSaveSearch = () => {
        saveSearchTerm(localSearchTerm);
        setShowConfirmation(!showConfirmation)
    };

    useEffect(() => {
        try {
            const storedSearchTerms = localStorage.getItem('searchTerms');
            if (storedSearchTerms) {
                setNewArray(JSON.parse(storedSearchTerms));
            }
        } catch (error) {
            console.error('Error parsing search terms from local storage', error);
        }
    }, []);





    const combinedSearchTerms = useMemo(() => {
        return searchTerm ? [...new Set([searchTerm, ...newArray])] : newArray;
    }, [newArray, searchTerm]);

    const reversedSearchTerms = [...combinedSearchTerms].reverse();

    const handleApplyClick = () => {
        if (searchTerm && !newArray.includes(searchTerm)) {
            const updatedArray = [...newArray, searchTerm];
            localStorage.setItem('searchTerms', JSON.stringify(updatedArray));
            setNewArray(updatedArray);
        }
    };

    // console.log(searchTerm)

    const filterSearch = items.filter(item =>
        typeof searchTerm === 'string' && item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        const { value, checked } = e.target;

        if (checked) {
            setSelectedValues(prevValues => [...prevValues, value]);
        } else {
            setSelectedValues(prevValues => prevValues.filter(item => item !== value));
        }
    };
    const selectedItemCount = selectedValues.length;

    const unchecked = (itemToRemove) => {
        setSelectedValues(prevValues => prevValues.filter(item => item !== itemToRemove));
    };

    const uncheckedAll = () => {
        setSelectedValues([])
    }

    const currentDate = () => {
        const today = new Date();
        const month = today.toLocaleString('default', { month: 'short' });
        const date = today.getDate();
        const year = today.getFullYear();

        return `${month} ${date},${year}`;
    }



    // console.log(currentDate())






    return (
        <>
            <div className="container">
                    <div className="menu-mob" onClick={()=>setMobMenu(!mobMenu)}><CgMenu/></div>
                <div className="left-container">
                    <div className="left-contact-con">
                        <div className="mob-close-menu" onClick={()=>setMobMenu(false)}><FaXmark/></div>
                        <div className="top-contact-nav">
                            <h4>Contact Search</h4>
                            <button onClick={() => setShowConfirmation(!showConfirmation)}><HiBellAlert className='notif-icon' /> Save Search</button>

                            {
                                showConfirmation ?
                                    <div className="confirmation-container">
                                        <div className="confirmatoin-box">
                                            <p>Are you sure you want to save this search?</p>
                                            <div className="confirmation-btn">
                                                <button onClick={handleSaveSearch}>Yes</button>
                                                <button onClick={() => setShowConfirmation(false)}>No</button>
                                            </div>


                                        </div>
                                    </div> : null
                            }


                            {/* <button onClick={handleSaveSearch}><HiBellAlert className='notif-icon' /> Save Search</button> */}
                        </div>

                        <div className="level-dropDown" onClick={() => setdrobDown(!dropdown)}>
                            <p>Level</p>
                            <p>
                                {selectedValues.length > 0 ?
                                    <div className="count-num"><p className='count'>{selectedItemCount}</p></div> :
                                    <IoChevronDown />
                                }
                            </p>
                        </div>
                        {
                            dropdown ?
                                <div className="filter-box">

                                    <div className="input-con">
                                        <input
                                            type="text"
                                            placeholder='Filter Level'
                                            value={searchTerm}
                                            onChange={handelSearch}
                                        />
                                    </div>
                                    <div className="check-list">

                                        <div className="checkbox_list">

                                            {
                                                filterSearch.filter(term => term.trim() !== '').map((item, index) =>
                                                    <div className="group-check" key={index}>
                                                        <label class="checkbox-container"><span className='mark'>{item}</span>
                                                            <input
                                                                type="checkbox"
                                                                value={item}
                                                                checked={selectedValues.includes(item)}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </div>
                                                )
                                            }


                                        </div>
                                    </div>

                                    <div className="btn-con">
                                        <button className='applyButton' onClick={handleApplyClick}>Apply</button>
                                    </div>

                                </div> : null
                        }

                    </div>
                </div>

                {/* ==========================left container end============================= */}

                <div className="right-container">
                    {
                        selectedValues.length > 0 ?
                            <div className="">
                                {selectedValues.length > 0 && (

                                    //===============================checked list start==============
                                    <div className="main-container">
                                        <div className="top-checked">
                                            {selectedValues.map((item, index) =>

                                                <p className='list-clear' key={index}>{item} <FaXmark className='xmark' onClick={() => unchecked(item)} /> </p>
                                            )}
                                            <p>{isChecked}</p>
                                            <button className='clearall' onClick={uncheckedAll}>Clear All</button>
                                        </div>

                                        <h2 className='contact-text-count'>6021 Contacts Companies</h2>

                                        <div className="contact-container-list">

                                            {
                                                Records.filter(record => selectedValues.includes(record.level)).map((data, index) =>
                                                    <div className="container-part" key={index.id}>
                                                        <div className="name-details">
                                                            <div className="name"><p>{data.name} <FaLinkedin className='linkedin_icon' /></p></div>
                                                            <div className="desgi">
                                                                <p> {data.designation}</p>
                                                            </div>
                                                            <div className="location"><p><CiLocationOn className='locatio_icon' /> {data.location}</p></div>
                                                        </div>
                                                        <div className="contact-details">
                                                            <div className="mail"> <span><CiMail className='mail_icon' /></span><span className='mail-text'> {data.mail}</span> <span className='num_prec'>{data.precenatge}%</span></div>
                                                            <div className="mail"> <span className='phone_icon'><FiPhone /></span><span className='mail-text'> {data.phone}</span> <span className='mobile'>Mobile</span></div>
                                                        </div>
                                                        <div className="view">
                                                            <button onClick={() => { setSelectedItem(data); setShowPopup(true); }}>View</button>

                                                        </div>
                                                    </div>
                                                )
                                            }


                                        </div>


                                    </div>



                                )}

                            </div> :
                            /* =============contact save search show normal start==================== */
                            <div className="contact-save-list">
                                <p>
                                    Provide Your Serach criteria and find your contacts from <br />  over 200M+  business contact
                                </p>

                                <h4>Recently Saved Searches</h4>
                                <div className="tab-con">
                                    <div className="head-tab">
                                        <p>Name</p>
                                        <p>Create Date</p>
                                    </div>
                                    {reversedSearchTerms.map((item, index) =>
                                        <div className="head-child" key={index}>
                                            <p>{item}</p>
                                            <p>{currentDate()}</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        /* =============contact save search show normal end==================== */
                    }









                </div>
            </div>

            {
                showPopup && selectedItem && (<div className="modal">
                    <div className="modal-box">
                        <div className="close" onClick={() => { setShowPopup(false) }}><FaXmark /></div>

                        <div className="tab-model">
                            <div className="model-container">
                                <div className="left-model"><h3>Name</h3></div>
                                <div className="right-model"><h3>{selectedItem.name}</h3></div>
                            </div>
                            <div className="model-container">
                                <div className="left-model"><h3>Designation</h3></div>
                                <div className="right-model"><h3>{selectedItem.designation}</h3></div>
                            </div>
                            <div className="model-container">
                                <div className="left-model"><h3>Location</h3></div>
                                <div className="right-model"><h3>{selectedItem.location}</h3></div>
                            </div>
                            <div className="model-container">
                                <div className="left-model"><h3>Mail</h3></div>
                                <div className="right-model"><h3>{selectedItem.mail}</h3></div>
                            </div>
                            <div className="model-container">
                                <div className="left-model"><h3>Phone</h3></div>
                                <div className="right-model"><h3>{selectedItem.phone}</h3></div>
                            </div>
                            <div className="model-container">
                                <div className="left-model"><h3>Completed</h3></div>
                                <div className="right-model"><h3>{selectedItem.precenatge}</h3></div>
                            </div>
                            <div className="model-container">
                                <div className="left-model"><h3>Level</h3></div>
                                <div className="right-model"><h3>{selectedItem.level}</h3></div>
                            </div>
                        </div>


                        <div className="close-button" >
                            <button onClick={() => { setShowPopup(false) }}>Close</button>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default ContactSearch