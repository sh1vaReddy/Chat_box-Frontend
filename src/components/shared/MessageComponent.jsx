import { Typography, Avatar, Box } from "@mui/material";
import { memo } from "react";
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderComponent from './RenderComponent';

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: sameSender ? "row" : "row-reverse",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      {!sameSender && (
        <Avatar
          alt={sender.name}
          src={sender.avatar}
          style={{ marginRight: "0.5rem" }}
        />
      )}
      <div
        style={{
          backgroundColor: sameSender ? "#D0E7FF" : "#F5F5F5", 
          color: "black",
          borderRadius: "10px",
          padding: "0.5rem",
          maxWidth: "70%",
        }}
      >
        {!sameSender && (
          <Typography
            variant="caption"
            style={{ fontWeight: 600, marginBottom: "0.25rem" }}
          >
            {sender.name}
          </Typography>
        )}
        <Typography>{content}</Typography>

        {attachments.length > 0 && (
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <Box key={index}>
                <a
                  href={url}
                  target="_parent"
                  download
                  style={{
                    color: "black",
                  }}
                >
                  {RenderComponent(file, url)}
                </a>
              </Box>
            );
          })
        )}
        <Typography
          variant="caption"
          style={{ color: "rgba(0, 0, 0, 0.5)", marginTop: "0.5rem" }}
        >
          {timeAgo}
        </Typography>
      </div>
    </div>
  );
};

export default memo(MessageComponent);
