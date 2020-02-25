import React from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

const LoadMoreWrapper = styled.div`
    position: relative;
    height: 70px;
`;

export default class LoadMore extends React.PureComponent {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollAtBottom = window.innerHeight + window.scrollY
            >= this.props.containerRef.current.offsetHeight + this.props.containerOffset;

        if (scrollAtBottom && this.props.enableLoader && !this.props.showLoader) {
            this.props.handleLoadMore();
        }
    }

    render() {
        const {
            showLoader,
        } = this.props;

        if (!showLoader) return null;

        return (
            <LoadMoreWrapper>
                <Loader active />
            </LoadMoreWrapper>
        );
    }
}