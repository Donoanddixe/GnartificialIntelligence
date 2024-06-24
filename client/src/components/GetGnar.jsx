import React from 'react'

export const GetGnar = () => {

    const submitHandler = () => {
        e.preventDefault()
        axios.post('http://localhost:8099/api/request', { style, prompts, requests })
            // YOU ARE HERE. FINISH SETTING UP SUBMIT FUNCTION.
            .then((res) => {
                setUser(res.data)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // need submit handler .post to match userSongRequest.controller
    // once submit handler is triggered, user is redirected to their library and 
    // request shows up in queue along with any existing downloads?
    // you set this up in your back end already. lethargic ska, never forget. set this up in your front end
    return (
        <div>
            <h2>Submit your song request here!</h2>
            <p>Prepare to get gnar</p>
            <form>
                <label> Song Style?
                    <input type="text" name='style' placeholder='song style' />
                </label>
                <label>Prompts:
                    <textarea type="textarea" name='prompts' placeholder='enter prompts here' rows='2' cols='30' ></textarea>
                </label>
                <label>Additional Requests:
                    <textarea type="textarea" name='requests' placeholder='additional requests' rows='2' cols='30' ></textarea>
                </label>
                <button>Submit Song Request</button>
                {/* pass your submit handler in the button this will match your request route */}
            </form>
        </div>
    )
}
