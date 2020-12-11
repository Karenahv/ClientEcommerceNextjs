import React from 'react'
import queryString from 'query-string'
import {Pagination as PaginationSU} from 'semantic-ui-react'
import {useRouter} from "next/router";

export default function Pagination (props){
    const {totalGames, page, limitPerPage} = props
    const totalPage = Math.ceil(totalGames/limitPerPage)
    const router = useRouter()
    const urlParse = queryString.parseUrl(router.asPath)

    const goToPage = (newPage) => {
            urlParse.query.page = newPage;
            const url = queryString.stringifyUrl(urlParse)
            router.push(url)
    }
    return (
        <div className={'pagination'}>
            <PaginationSU
                defaultActivePage={page}
                totalPage={totalPage}
                firstItem={null}
                lastItem={null}
                onPageChange={(_, data) => goToPage(data.activePage)}
                boundaryRange={0}
                siblingRange={1}
                ellipsisItem={null}
            >

            </PaginationSU>
        </div>
    )
}
