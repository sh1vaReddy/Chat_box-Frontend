import { Menu, MenuItem, MenuList, Tooltip, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setIsFileMenu } from '../../redux/reducers/miscs';
import { Image } from '@mui/icons-material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useRef } from 'react';

const FielMenu = ({ anchorEl }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.miscs);
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  };

  const selectImage = () => {
    if (imageRef.current) {
      console.log("Clicking image input");
      imageRef.current.click();
    } else {
      console.error("Image input ref is null");
    }
  };

  const selectAudio = () => {
    if (audioRef.current) {
      console.log("Clicking audio input");
      audioRef.current.click();
    } else {
      console.error("Audio input ref is null");
    }
  };

  const selectVideo = () => {
    if (videoRef.current) {
      console.log("Clicking video input");
      videoRef.current.click();
    } else {
      console.error("Video input ref is null");
    }
  };

  const selectFile = () => {
    if (fileRef.current) {
      console.log("Clicking file input");
      fileRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  };

  const fileChangeHandler = (e, key) => {
    console.log(`${key} files selected:`, e.target.files);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={isFileMenu}
      onClose={closeFileMenu}
      PaperProps={{
        sx: {
          width: '200px',
        },
      }}
    >
      <MenuList>
        <MenuItem onClick={selectImage}>
          <Tooltip title="Image">
            <Image />
          </Tooltip>
          <ListItemText style={{ marginLeft: '0.5rem' }}>Image</ListItemText>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: 'none' }}
            onChange={(e) => fileChangeHandler(e, 'images')}
            ref={imageRef}
          />
        </MenuItem>
        <MenuItem onClick={selectAudio}>
          <Tooltip title="Audio">
            <AudiotrackIcon />
          </Tooltip>
          <ListItemText style={{ marginLeft: '0.5rem' }}>Audio</ListItemText>
          <input
            type="file"
            multiple
            accept="audio/mpeg, audio/wav"
            style={{ display: 'none' }}
            onChange={(e) => fileChangeHandler(e, 'Audios')}
            ref={audioRef}
          />
        </MenuItem>
        <MenuItem onClick={selectVideo}>
          <Tooltip title="Video">
            <VideoLibraryIcon />
          </Tooltip>
          <ListItemText style={{ marginLeft: '0.5rem' }}>Video</ListItemText>
          <input
            type="file"
            multiple
            accept="video/mp4, video/webm, video/ogg"
            style={{ display: 'none' }}
            onChange={(e) => fileChangeHandler(e, 'Videos')}
            ref={videoRef}
          />
        </MenuItem>
        <MenuItem onClick={selectFile}>
          <Tooltip title="Document">
            <SummarizeIcon />
          </Tooltip>
          <ListItemText style={{ marginLeft: '0.5rem' }}>Document</ListItemText>
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => fileChangeHandler(e, 'Files')}
            ref={fileRef}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FielMenu;
