import React from 'react'

function TopingList(data, handleChange) {
    console.log(data.data)
    return (
        <div>
            {/* <p>{data.name}</p> */}
            {data.data.map((item, index) => (
                <div id="topingDiv" >
                    <>
                        <input name={item.name} value={item.id} type="checkbox" id={` "myCheckbox ${item.id} " `}
                            className="check"
                            onChange={handleChange}
                        />
                        <label for={` "myCheckbox ${item.id} " `} >
                            <img src={item.image} id="topingStyle" class="topingstyle" />
                        </label>
                    </>
                </div>
            ))}
        </div>
    )
}

export default TopingList
