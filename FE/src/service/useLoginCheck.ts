import { useHistory } from 'react-router-dom';

const useLoginChcek = () => {
  const history = useHistory();
  const accountBookId = useHistory().location?.state;
  if (
    !window.localStorage.getItem('accessToken') ||
    window.localStorage.getItem('accessToken') === 'undefined'
  ) {
    history.push('/login');
    return false;
  }

  return accountBookId;
};

export default useLoginChcek;
