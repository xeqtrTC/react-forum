import React from 'react'
import { format, formatDistance, formatRelative, subDays, parseISO, compareAsc   } from 'date-fns'


function DateFormat(date) {
  return format(parseISO(date), "MMMM Qo, yyyy, H:m a")

}

export default DateFormat