import React, {useState,useEffect} from 'react';
import { Card, CardContent, Typography, Box, Button, Grid, Avatar } from '@mui/material';
import AttendanceHeader from './AttedenceHeader';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { getImageUrl } from 'utils/common/imageUtlils';
import { profilePlaceholder } from 'utils/placeholders';
import AttendanceConfirmDialog from './confirmDialog';
import toast from 'react-hot-toast';
import { getClassAttendanceDetails, updateAttendanceDetails } from '../../services';
import { useSpinner } from 'context/SpinnerProvider';



const Attendance = ({setShowAttendance,classDetails}) => {
  const [ attendance,setAttendance] = useState(null)
  const [ cancel,setCancel ] = useState(false)
  const { showSpinner,hideSpinner } = useSpinner()
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);



  const handleSubmit = () => {
    setCancel(true)
  }
  
  const mapToBackGroundColor = {
    'present' : "#D2F4EA",
    'absent'  : "#F8D7DA"
  }

  const mapToTextColor = {
    'present' : '#1AA179',
    'absent'  : '#DC3545'
  }
 

  const handleGetAttendance = async () => {
    try{
    showSpinner()
    const data = { classId : classDetails?._id }
    const response = await getClassAttendanceDetails(data)
    setAttendance(response)
    const initialPresentCount = response.students.filter(student => student.attedence === 'present').length;
    const initialAbsentCount = response.students.filter(student => student.attedence === 'absent').length;
    console.log(initialAbsentCount,initialPresentCount,"count",response)
    setPresentCount(initialPresentCount);
    setAbsentCount(initialAbsentCount);
    hideSpinner()
    }catch(error){
      hideSpinner()
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(()=>{
    handleGetAttendance()
  },[])

  const handleChangeAttendance = (id,newAttendance) => {
     setAttendance((prevAttendance) => {
      if(!prevAttendance) return prevAttendance

      const updatedAttendance = prevAttendance?.students?.map((student)=>
      student?._id === id ? {...student,attedence:newAttendance} 
      :
      student   
      )
      return {...prevAttendance,students:updatedAttendance}
     })
     const checkAttendanceState = (state) => {
      const status = attendance?.students?.some((student)=> student?._id === id && student?.attedence !== state )
      return status
     }
     if(newAttendance==="present" && checkAttendanceState('present')){
      setPresentCount((prev)=>prev+1)
      setAbsentCount((prev)=> {if(!prev){return prev}else {return prev-1}  })
     }else if(newAttendance === 'absent' && checkAttendanceState('absent') ){
      setAbsentCount((prev) => prev+1)
      setPresentCount((prev)=> {if(!prev){return prev}else {return prev-1}})
     }
  }

  const updateAttendance = async() => {
    try {
    showSpinner()
    const response = await updateAttendanceDetails(attendance) 
    console.log(response,"response",attendance)
    setAttendance(response)
    toast.success("attendance taked successfully")
    setCancel(false)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }finally{
      hideSpinner()
    }
  }
  
  return (
    <>
    <AttendanceHeader setShowAttendance={setShowAttendance} classDetails={classDetails} presentCount={presentCount} absentCount={absentCount} />
    <Box sx={{ backgroundColor : "white",height:"auto", borderRadius: "10px",borderTopLeftRadius:"0px",borderTopRightRadius:"0px", border: "1px solid #C3C3C3", boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.14)" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:"40px" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "20px", lineHeight: "24px", color: "#000" }}>
          Attendance List
        </Typography>
        <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#5611B1", boxShadow: "0px 6px 34px -8px #0D6EFD", borderRadius: "8px", padding: "9px 24px", color: "#FBFBFB", fontSize: "14px", fontWeight: 500, lineHeight: "22px"}}>
          Submit
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ padding: "40px", overflow:"auto"}} >
        {attendance?.students?.map((student) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={student?.student?.id} sx={{}} >
            <Card sx={{ padding: '10px', display: 'flex', flexDirection:"column",backgroundColor:"#FFFFFF",boxShadow:"none", borderRadius: "12px" }}>
              <Box sx={{display:"flex", justifyContent: "flex-end",pr:"15px",pt:"6px"}} >
                <MoreHorizOutlinedIcon />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center"}} >
              <Avatar src={student?.student?.image ? getImageUrl(student?.student?.image) : profilePlaceholder } alt={student?.student?.full_name} sx={{ width:"60px",height:"60px" }} />
              </Box>
              <Box sx={{ flexGrow: 1 , justifyContent: "center",display:"flex",flexDirection:"column", alignItems: "center", py: "10px"}}>
                <Box sx={{ display: "inline-flex"}} >
                    <Typography variant="body2" sx={{ color: "#232323", fontSize: "14px", fontWeight:600, lineHeight: "24px"}} >
                      ID : &ensp;
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#232323", fontSize: "12px", fontWeight:400, lineHeight: "24px"}} >
                      {student?.student?.id}
                    </Typography>
                </Box>
                <Box sx={{ display: "inline-flex"}} >
                  <Typography variant="body1" sx={{ color: "#232323", fontSize: "14px", fontWeight:600, lineHeight: "24px"}} >
                    Name : &ensp;
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#232323", fontSize: "12px", fontWeight:400, lineHeight: "24px"}} >
                    {student?.student?.full_name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{display:"flex",backgroundColor:"#E9ECEF",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",WebkitJustifyContent:"space-around"}} >
                 <Typography onClick={()=>handleChangeAttendance(student?._id,'present')} sx={{ cursor: "pointer", padding:"8px 17px", color: student?.attedence === "present" ? mapToTextColor[student?.attedence] : "#6C757D", fontsize:"16px",fontWeight: 500, lineHeight:"24px",width:"44vh",textAlign:"center",borderBottomLeftRadius:"8px",backgroundColor: student?.attedence === "present" ? mapToBackGroundColor[student?.attedence] : ''}} >
                   Present
                 </Typography>
                 <Typography onClick={()=>handleChangeAttendance(student?._id,'absent')} sx={{ cursor: "pointer", padding:"8px 19px",color: student?.attedence === "absent" ? mapToTextColor[student?.attedence] : "#6C757D", fontSize: "16px", fontWeight: "500", lineHeight: "24px",width:"44vh",textAlign:"center",borderBottomRightRadius:"8px",backgroundColor: student?.attedence === "absent" ? mapToBackGroundColor[student?.attedence] : '' }} >
                   Absent
                 </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    <AttendanceConfirmDialog
    open={cancel}
    onClose={()=>setCancel(false)}
    onSubmit = {updateAttendance}
    presentCount = { presentCount }
    absentCount = { absentCount }
    />
    </>
  );
};

export default Attendance;
