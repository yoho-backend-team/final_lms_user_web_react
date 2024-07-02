import React, {useEffect, useState} from 'react'
import { useSearchParams ,useLocation, useParams} from 'react-router-dom'
import ClassCard from 'features/instructor-pages/classes-page/components/classOverview'
import ClassLayout from 'features/instructor-pages/classes-page/components/classLayout'
import { getClassDetails } from 'features/instructor-pages/classes-page/services'

const ClassViewPage = () => {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const { id } = useParams()
    const classId = location?.state?.id
    const classType = searchParams.get("type")
    const [classDetails,setClassDetails] = useState(null)
   
    useEffect(()=>{
      const getClass = async () => {
      const data = { classType : classType, course : id }
      const response = await getClassDetails(data)
      setClassDetails(response)
      }
      getClass()
    },[])


    return (
        <ClassLayout>
            <ClassCard type={classType} classDetails={classDetails} />
        </ClassLayout>
    )
}

export default ClassViewPage