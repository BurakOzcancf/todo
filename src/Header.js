import React from 'react'

const Header = () => {
    const [clock, setClock] = React.useState("")
    const [greetings, setGreetings] = React.useState("")
    
    React.useEffect(() => {
        setInterval(() => {
            setClock(new Date().toLocaleTimeString())
        }, 1000);
    }, []);

    const options = { weekday: "long", year: "numeric", day: "numeric", month: "long" }
    const date = new Date().toLocaleDateString("en-US", options)

    React.useEffect(() => {
        if (clock.slice(0, 2) > 6 && clock.slice(0, 2) <= 10) {
            setGreetings("Good morning")
        }
        else if (clock.slice(0, 2) > 10 && clock.slice(0, 2) <= 15) {
            setGreetings("Good Afternoon")
        }
        else if (clock.slice(0, 2) > 15 && clock.slice(0, 2) <= 21) {
            setGreetings("Good Evening")
        }
        else if (clock.slice(0, 2) > 22 || clock.slice(0, 2) <= 6) {
            setGreetings("Good Night")
        }
    }, [clock])

    return (
        
        <section className="header__container" >   
            <h1 className='sr-only'>ToDo App</h1>
          <span className='header__date'> {date} </span>
          <div className="header__brand">
              <h2 className='header__title'>ToDo</h2>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"5rem"} >
                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 
                  419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87
                   220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6
                   105.4H438.6z" />
              </svg>
          </div>
          <div className="header__period">
              <h3 className='header__greetings'> {greetings}</h3>
              <h4 className='header__clock'> {clock} </h4>
          </div>
      </section>
  )
}

export default Header