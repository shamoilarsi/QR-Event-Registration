import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from './Colors';

const Typography = {
  heading: {
    fontFamily: 'Poppins-Bold',
    color: Colors.secondary.header,
    fontSize: RFPercentage(4),
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.secondary.title,
    fontSize: RFPercentage(2.5),
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    color: Colors.secondary.title,
    fontSize: RFPercentage(1.5),
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: Colors.secondary.title,
    fontSize: RFPercentage(2.1),
  },
};

export default Typography;
