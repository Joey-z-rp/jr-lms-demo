import React from 'react';
import { Button, Container, Pagination, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CourseCard from './components/CourseCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import FlexContainer from '../UI/flexContainer/FlexContainer';
import Header from '../UI/header/Header';
import LoadMore from '../UI/loadMore/LoadMore';
import { COURSE_BASE_URL } from '../routes/URLMap';
import { fetchCourses } from '../api/course';

class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            error: null,
            isLoading: false,
            pagination: {},
        };

        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses = (pageNum, pageSize) => {
        this.setState({ isLoading: true }, () => {
            fetchCourses(pageNum, pageSize)
                .then(this.updateCourseData)
                .catch(error => this.setState({ error }));
        });
    }

    updateCourseData = courseData => {
        this.setState(state => ({
            courses: [
                ...state.courses,
                ...courseData.courses,
            ],
            isLoading: false,
            pagination: courseData.pagination,
        }));
    }

    handleLoadMore = () => {
        this.loadCourses(this.state.pagination.page + 1);
    }

    render() {
        const currentPath = this.props.location.pathname;

        return (
            <div ref={this.containerRef}>
                <ErrorMessage error={this.state.error} />
                <Header as="h2" textAlign="center">
                    Courses
                </Header>
                <Container>
                    <Button as={Link} to={`${currentPath}/new`} primary>
                        Create New Course
                    </Button>
                    <Segment basic loading={this.state.isLoading}>
                    <FlexContainer justifyContentValue="space-between">
                        {this.state.courses.map(course => (
                            <CourseCard
                                courseDescription={course.description}
                                courseImage={course.image}
                                courseName={course.name}
                                key={course.code}
                                to={`${COURSE_BASE_URL}/${course.code}`}
                            />
                        ))}
                    </FlexContainer>
                    </Segment>
                </Container>
                <LoadMore
                    enableLoader={this.state.pagination.page && this.state.pagination.page < this.state.pagination.pages}
                    containerRef={this.containerRef}
                    showLoader={this.state.courses.length > 0 && this.state.isLoading}
                    handleLoadMore={this.handleLoadMore}
                    containerOffset={90}
                />
            </div>
        );
    }
};

export default Courses;
