export const calculateTotalTime = (time1, time2) => {
  let hours1 = time1.substring(0,2)
  let minutes1 = time1.substring(3,5)
  let seconds1 = time1.substring(6)

  let hours2 = time2.substring(0,2)
  let minutes2 = time2.substring(3,5)
  let seconds2 = time2.substring(6)

  let totalHours = parseInt(hours1) + parseInt(hours2)
  let totalMinutes = parseInt(minutes1) + parseInt(minutes2)
  let totalSeconds = parseInt(seconds1) + parseInt(seconds2)

  return standardizeDuration(totalHours, totalMinutes, totalSeconds)
}

export const standardizeDuration = (hours, minutes, seconds) => {
  if(seconds > 60){
    minutes += 1
    seconds -= 60


  }
  if(minutes > 60){
    hours += 1
    minutes -= 60


  }

  if(seconds < 10){
    seconds = `0${seconds}`
  }
  if(minutes < 10){
    minutes = `0${minutes}`
  }
  if(hours < 10){
    hours = `0${hours}`
  }

  return `${hours}:${minutes}:${seconds}`

}

import { useEffect } from "react"

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
      const handleClickOutside = (evt) => {
          if (ref.current && !ref.current.contains(evt.target)) {
              callback(); //Do what you want to handle in the callback
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  });
};
