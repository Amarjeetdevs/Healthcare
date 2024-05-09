export const host = "http://localhost:5001";
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
// export const deleteUser =    `${host}/api/userid`;

export const registerDoctor = `${host}/api/auth/doctor-register`;
export const loginDoctorRoutes = `${host}/api/auth/doctor-login`;
export const getAllDoctorRoutes = `${host}/api/auth/doctor-getall`;
export const doctor_setAvatar = `${host}/api/auth/doctor-setavatar/:id`

// schedulig Routes 

export const AddNewSlotFordoctor = `${host}/api/v2/avlble/availability`;
export const GetAllSlotFordoctor = `${host}/api/v2/avlble/availabilityall`;
export const GetIdForDoctor = `${host}/api/v2/avlble/find-doctorId`;

// appointment Routes 

export const Newappointment =  `${host}/api/v1/apoint/appointments/book`;
export const getAllappointmentList =  `${host}/api/v1/apoint/appointments`;
export const getAllappointmentListByUser =  `${host}/api/v1/apoint/appointments`;
export const cancelbyuser =  `${host}/api/v1/apoint/cancelbyuser`;
export const getAppointmentsListByDoctor = `${host}/api/v1/apoint/appointments/doctor`;



// payments 
export const paymentroutes = `${host}/order`
export const paymentvalidation = `${host}/validatate`
