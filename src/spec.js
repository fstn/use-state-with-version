import React, { useMemo } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import useStateWithVersion from './';

configure({ adapter: new Adapter() });

const SomeComponent = () => {
  const [user, setUser] = useStateWithVersion({ name: 'Tom' });
  const oldUser = useMemo(() => user, []);
  return (
    <div>
      <p>{user.name}</p>

      <button type="button" onClick={() => setUser({ ...user, name: 'Bob' })}>
        ChangeName
      </button>
      <button type="button" onClick={() => {
        try {
          setUser({ ...oldUser, name: 'Error' });
        } catch (e) {
          document.title = e.message;
        }
      }}>
        Error
      </button>
    </div>
  );
};

describe('useStateWithVersion', () => {
  it('works the same as useState, but check version', () => {
    const wrapper = mount(<SomeComponent/>);

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).to.eql('Tom');

    expect(document.title).to.eql('');

    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).to.eql('Bob');

    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).to.eql('Bob');

    expect(document.title).to.eql('OptimisticLock: existing version is more recent than old one: {"name":"Bob","__INTERNAL__VERSION":1} new one: {"name":"Error","__INTERNAL__VERSION":0}');
  });
});
