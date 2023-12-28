import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./App.css";
import { Alert, Card, CardContent, CircularProgress, Divider, Snackbar, Tooltip } from "@mui/material";
import CustomInput from "./components/input";
import { Tab, Tabs, TabsList, TabPanel } from "./components/customTabs";
import CustomDropDown from "./components/customSelect";
import CustomTextArea from "./components/customTextArea";
import CustomButton from "./components/customButton";
function App() {
  const [kitName, setKitName] = React.useState('')
  const [callToAction, setCallToAction] = React.useState('Select')
  const [customCTA, setCustomCTA] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [err, setErr] = React.useState('');

  const handleCustomCTA = (e) => {
    
    if(customCTA.length < 20){
      setCustomCTA(e)
    }else{
      let x = e.toString().slice(0, 20)
      setCustomCTA(x)
    }
  }

  const handleSubmit = () => {
    if(kitName.length < 1){
      setErr('Please enter the brand kit name')
      setOpenErr(true)
      return
    }

    if(callToAction == 'Select' && customCTA.length < 1){
      setErr('Please select a call to action or provide a custom one')
      setOpenErr(true)
      return
    }
    setLoading(true)
    const data = {
      kitName, callToAction, customCTA
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:2000/create-brand-kit', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status){
          setOpen(true)
        }else{
          setErr(data.message)
          setOpenErr(true)
        }
        setLoading(false)
      }).catch(error => {
        setErr(error.message)
        setOpenErr(true)
        setLoading(false)
      });

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCloseErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
  };


  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Brand Kit Created Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleCloseErr} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseErr} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
      <Box
        m={"auto"}
        p={10}
        justifyContent="center"
      >
        <Box>
          <Typography
            textAlign={"left"}
            fontFamily={"Exo"}
            fontSize={"32px"}
            fontWeight={600}
            fontStyle={"normal"}
            color={"#191C26"}
            lineHeight={"42px"}
          >
            Brand Kit
          </Typography>
          <Box height={7}></Box>
          <Typography
            textAlign={"left"}
            fontFamily={"Manrope"}
            fontSize={"18px"}
            fontWeight={400}
            fontStyle={"normal"}
            color={"#191C26"}
          >
            Here you can set the brand kit for your Short-Form clips. Note,{" "}
            <br />
            long-form videos are not affected by this brand kit
          </Typography>
        </Box>
        <Box height={32}></Box>
        <Card elevation={0}>
          <CardContent>
            <Box p={8}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography
                  textAlign={"left"}
                  fontFamily={"Manrope"}
                  fontSize={"18px"}
                  fontWeight={600}
                  fontStyle={"normal"}
                  color={"#191C26"}
                  lineHeight={"22px"}
                >
                  Brand kit name
                </Typography>
                <Box width={"37px"}></Box>
                <CustomInput type={'text'} autoComplete={'off'} error onChange={(e)=>setKitName(e.target.value)} placeholder={'My brand kit'} />
              </Box>

              <Box
                marginTop={"37px"}
                marginBottom={'36px'}
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  // height: 224,
                }}
              >
                <Tabs defaultValue={2} orientation="vertical">
                  <TabsList>
                    <Tab>Text</Tab>
                    <Tab>Logo</Tab>
                    <Tab>Outro</Tab>
                    <Tab>Custom brand kit</Tab>
                  </TabsList>
                  <TabPanel value={0}>
                    <Box minWidth={'36vw'}>Text</Box>
                  </TabPanel>
                  <TabPanel value={1}>
                    <Box minWidth={'36vw'}>Logo</Box>
                  </TabPanel>
                  <TabPanel value={2}>
                    <Box minWidth={'36vw'}>
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Typography
                          textAlign={"left"}
                          fontFamily={"Manrope"}
                          fontSize={"20px"}
                          fontWeight={600}
                          fontStyle={"normal"}
                          color={"#191C26"}
                          lineHeight={"22px"}
                        >
                          Outro
                        </Typography>
                        <Tooltip title="We will show the call to action at the end of the clip">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle cx="8" cy="8" r="7.5" stroke="black" />
                          <path
                            d="M8 4V7.55556"
                            stroke="#191C26"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 11.1133H8.00889"
                            stroke="#191C26"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        </Tooltip>
                        
                      </Box>
                      <Box display={"flex"} mt={"42px"} justifyContent={'space-between'}>
                        <Typography
                          textAlign={"left"}
                          fontFamily={"Manrope"}
                          fontSize={"14px"}
                          fontWeight={400}
                          fontStyle={"normal"}
                          color={"#191C26"}
                          lineHeight={"22px"}
                        >
                          Call to action
                        </Typography>
                        <CustomDropDown
                          placeholder={'Select'}
                          value={callToAction}
                          defaultValue={'Select'}
                          handleChange={(e)=>setCallToAction(e.target.value)}
                          items={[
                            { key: "Select", value: 'Select'},
                            { key: "Listen on Spotify", value: 'Listen on Spotify' },
                            { key: "Listen on Apple", value: 'Listen on Apple' },
                            { key: "Listen on Google", value: 'Listen on Google' }
                          ]}
                        />

                      </Box>
                      <Box display={"flex"} mt={"42px"} justifyContent={'space-between'}>
                        <Typography
                          textAlign={"left"}
                          fontFamily={"Manrope"}
                          fontSize={"14px"}
                          fontWeight={400}
                          fontStyle={"normal"}
                          color={"#191C26"}
                          lineHeight={"22px"}
                        >
                          Custom call to action
                        </Typography>
                        <Box marginLeft={10}>
                          <CustomTextArea value={customCTA} onChange={(e)=>handleCustomCTA(e.target.value)} placeholder={'The Most Amazing Podcast Ever!'} />
                          <Typography textAlign={"right"}
                            fontFamily={"Manrope"}
                            fontSize={"12px"}
                            fontWeight={500}
                            fontStyle={"normal"}
                            color={"#191C26"}
                            lineHeight={"normal"}>{customCTA.length}/20</Typography>
                        </Box>
                       
                      </Box>
                      
                      
                    </Box>
                  </TabPanel>
                  <TabPanel value={3}>
                  <Box minWidth={'36vw'}>Custom Brand Kit</Box>
                  </TabPanel>
                </Tabs>
              </Box>
              <Divider />
              <Box display={'flex'} alignItems={'left'} mt={'24px'}>
                <CustomButton variant="contained" onClick={handleSubmit} disabled={loading}>
                 {loading ? <Box>Loading &nbsp; <CircularProgress size={10} sx={{ color: 'white'}} /></Box> : 'Save'}
                </CustomButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <div></div>
    </>
  );
}

export default App;
