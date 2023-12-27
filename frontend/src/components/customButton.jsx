/* eslint-disable react/prop-types */
import { Button as BaseButton } from '@mui/base/Button';
import { styled } from '@mui/system';

export default function CustomButton({...props}) {
  return (
    
      <Button {...props}>{props.children}</Button>
      
  );
}

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#2237FF',
  700: '#0066CC',
};

const Button = styled(BaseButton)(
  () => `
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  background-color: ${blue[600]};
  padding: 8px 16px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  border: 1px solid ${blue[600]};
 


`,
);
