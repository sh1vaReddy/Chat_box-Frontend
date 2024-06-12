import { Stack } from "@mui/material"
import { TypingSkeleton } from "../Stylecomponent"


const TypingLoader = () => {
  return (
    <Stack
    spacing={"0.5rem"}
    direction={"row"}
    padding={"0.5rem"}
    justifyContent={"center"}
    >
        <TypingSkeleton variant="circular" width={15} height={15}
        style={{
            animationDelay:"0.1s"
        }}
        />
         <TypingSkeleton variant="circular" width={15} height={15}
        style={{
            animationDelay:"0.2s"
        }}
        
        />
         <TypingSkeleton variant="circular" width={15} height={15}
        style={{
            animationDelay:"0.4s"
        }}
        />
         <TypingSkeleton variant="circular" width={15} height={15}
        style={{
            animationDelay:"0.6s"
        }}
        />
    </Stack>
  )
  

}

export default TypingLoader