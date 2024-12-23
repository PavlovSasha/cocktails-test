import { Typography } from 'antd';

const { Title } = Typography;

const NotFound = () => {
  return (
    <Title level={2} style={{ textAlign: 'center' }}>
      Page not found
    </Title>
  );
};

export default NotFound;
