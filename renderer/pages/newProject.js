import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import styles from "./components/NewProject.module.css"
import Navbar from "./navbar"
import Link from 'next/link'

function Newproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    //const [username, setusername] = useState("")
    //setusername(sessionStorage.getItem("username"))
    const [username, setusername] = useState("")
    useEffect(() => {
        setusername(sessionStorage.getItem("username"))
    })
    console.log(username)
    
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Description: "",
        Categories: [],
        Roadmap: [],
        Repository: "",
        Creator: "",
        Links: [],
        Update: [{
            Version: "",
            Changes: []
        }]
    })

    const {Project_Title, Update, Description, Categories, Creator, Roadmap, Repository} = projectData
    const [buttonCheck, setbuttonCheck] = useState(false)
    const [link, setlink] = useState("")
    const [linklist, setlinkList] = useState([])
    const [tagName, settagName] = useState("")
    const [tagList, settagList] = useState([])
    const [goal, setgoal] = useState("")
    const [roadmap, setroadmap] = useState([])
    const [change, setchange] = useState("")
    const [changes, setchanges] = useState([])
    const [version, setversion] = useState("")

    function settingData(event){
        const name = event.target.name
        console.log(event.target.name)
        const value = event.target.value
        setProjectData((current) => ({...current, [name]: value}))
        
    }

    function settingtagName(event){
        settagName(event.target.value)
    }

    function settingtagList(event){
        settagList(current => {return [...current, tagName]})
        settagName("")
        event.preventDefault()
    }

    function settingGoal(event){
        setgoal(event.target.value)
    }

    function settingroadmap(event){
        setroadmap(current => {return [...current, goal]})
        setgoal("")
        event.preventDefault()
    }

    function settingLink(event){
        setlink(event.target.value)
    }

    function settingLinkList(event){
        setlinkList(current => {return [...current, link]})
        setlink("")
        event.preventDefault()
    }

    function settingChange(event){
        setchange(event.target.value)
    }

    function settingChanges(event){
        setchanges(current => {return [...current, change]})
        setchange("")
        event.preventDefault()
    }

    function saveData(event){
        projectData.Categories = tagList
        projectData.Roadmap = roadmap
        projectData.Creator = username
        projectData.Links = linklist
        projectData.Update = [{
            Version: version,
            Changes: changes
        }]
        console.log(Categories)
        serverClient.query(
            q.Create(
              q.Collection('Projects'),
              { data: projectData },
            )
          ).then(ret => console.log(ret.data))
    }


    function removeTag(id){

        settagList((current) => {
            return current.filter((tagList, index) => {return index !== id})
        })

    }


    function removeGoal(id){

        setroadmap((current) => {
            return current.filter((roadmap, index) => {return index !== id})
        })

    }


    function removeLink(id){

        setlinkList((current) => {
            return current.filter((linklist, index) => {return index !== id})
        })

    }

    function removeChange(id){

        setchanges((current) => {
            return current.filter((changes, index) => {return index !== id})
        })

    }

    function setVersion(event){
        setbuttonCheck(current => !current)
        event.preventDefault()
    }

    function settingVer(event){
        setversion(event.target.value)
    }



    return(
        <div><Navbar /><form id={styles.npform} >
            <input type="text" className={styles.newProjectItem} onChange={settingData} name="Project_Title"     value={Project_Title}   placeholder=" Project Title"   id={styles.Project_Title}    ></input>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Description"       value={Description}     placeholder=" Description"     id={styles.Description}      ></textarea>
            <div>
                <input type="text" className={styles.newProjectItem} onChange={settingtagName} name="Categories"        value={tagName}      placeholder="Categories"      id={styles.Categories}       ></input>
                <button onClick={settingtagList} id={styles.addCategory} type="submit">Add Category</button>
                <div className={styles.tagsDiv}>{tagList.map((current, index) => <p onClick={() => removeTag(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
            </div>
            <br />
            <div>
                <input type="text" className={styles.newProjectItem} onChange={settingLink} name="Link"        value={link}      placeholder="Link"      id={styles.Repository}       ></input>
                <button onClick={settingLinkList} id={styles.addCategory} type="submit">Add Link</button>
                <div className={styles.tagsDiv}>{linklist.map((current, index) => <p onClick={() => removeLink(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
            </div>
            <br />
            <input type="text" className={styles.newProjectItem} onChange={settingGoal} name="Roadmap"           value={goal}         placeholder="Roadmap"         id={styles.Categories}          ></input>
                <button onClick={settingroadmap} id={styles.addCategory} type="submit">Add Goal</button>
                <div className={styles.tagsDiv}>{roadmap.map((current, index) => <p onClick={() => removeGoal(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
                <button onClick={setVersion} id={styles.addUpdate} type="submit">Add Version</button>
                {buttonCheck === true && (
                    <div className={styles.versionDiv} name={Update} Value={Update}>
                        <input className={styles.newProjectItem} onChange={settingVer} name="Version"       value={version}     placeholder=" Version #"     id={styles.Version_num}      ></input>
                        <textarea className={styles.newProjectItem} onChange={settingChange} name="Changes"           value={change}         placeholder=" Changes"         id={styles.Changes}          ></textarea>
                        <button onClick={settingChanges} id={styles.addCategory} type="submit">Add Change</button>
                        <div className={styles.tagsDiv}>{changes.map((current, index) => <p onClick={() => removeChange(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
                    </div>
                )}
            
            <Link href="/projectdisplay"><a href="/projectdisplay"><button onClick={saveData} id={styles.submit} type="submit">Save</button></a></Link>
        </form></div>
    )
}

export default Newproject