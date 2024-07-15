import {useEffect, useState} from 'react'
import Header from '../components/Header'
import { useOutlet } from 'react-router-dom'
import AddRecipe from '../components/AddRecipe'

const Layout = () => {

  const outlet = useOutlet()
  const [addOpen, setAddOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)

  const getAddOpen = () => {return addOpen}
  const getMessageOpen = () => {return messageOpen}

  useEffect(() => {

    if(message !== ''){
      setMessageOpen(true)
      setTimeout(() => {
        setMessageOpen(false)
      }, 500)
    }
  }, [message])

  return (
    <div className={`flex flex-col w-screen h-screen items-center bg-orange-300 font-serif overflow-y-auto relative`}>
      <Header setAddOpen={setAddOpen} getAddOpen={getAddOpen}/>
      {messageOpen ? <Message text={message} getMessageOpen={getMessageOpen} /> : <></> }
      {addOpen ? <AddRecipe setAddRecipe={setAddOpen}/> : <></> }
      <div className={`w-2/3 my-10 ${addOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'}`} >
        {outlet}
      </div>
    </div>
  )
}

const Message = ({text, getMessageOpen}) => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
      if(getMessageOpen()){
        setVisible(true)
      }else{
        setVisible(false)
      }
  }, [getMessageOpen()])

  return(
    <div className={`bg-yellow-200 h-1/3 w-1/2 fixed z-50 left-1/2 top-2/4 -translate-y-1/2 -translate-x-1/2 transition duration-500 ${visible ? 'opacity-100 visible' : 'invisible'}`}>
      <p className='text-black'>{text}</p>
    </div>
  )
}

export default Layout
