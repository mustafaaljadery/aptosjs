export default {
  project: {
    link: 'https://github.com/mustafaaljadery/aptosjs',
  },
  logo: <strong>aptosjs</strong>,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – AptosJS',
    };
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://aptosjs.com" target="_blank">
          AptosJS
        </a>
        .
      </span>
    ),
  },
};
