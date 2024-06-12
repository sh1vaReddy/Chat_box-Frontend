import { Helmet } from 'react-helmet-async';

const Title = ({ title = "chart", description = "this is the Chat is called Chatbox" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
