import React, { useEffect, useRef, useState } from 'react'
import { GetTodosForHome, GraphQLLogin } from '../lib/api'
import Layout from '../components/layout';
import { Alert, AlertDescription, AlertIcon, Badge, Box, Button, Checkbox, CloseButton, Flex, FormControl, HStack, Input, useToast, VStack } from '@chakra-ui/react';
import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodosWithFetchMoreLazyQuery, useGetTodosWithFetchMoreQuery, useUpdateTodoMutation } from '../src/types/generated';
import { CheckCircleIcon } from '@chakra-ui/icons';
import MySkeleton from '../src/components/MySkeleton';
import { formatDistance } from 'date-fns';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const TodoApp = (props: any) => {

  const [todos, setTodos] = useState<any>([])
  const [todoCount, setTodoCount] = useState(0)

  const [fetch, fetchVars] = useGetTodosWithFetchMoreLazyQuery({
    onError: (err) => {
      debugger;

    },
    onCompleted: (data) => {
      const gdata = [...todos, ...data.todos || []]
      const gDataWithSelectProps = gdata.map((g) => {
        return { ...g, selected: false, }
      })

      setTodos(gDataWithSelectProps)
      setTodoCount(data.todosConnection?.aggregate?.count || 0)
    }
  })

  useEffect(() => {
    try {
      setTodoCount(props.data.todosConnection.aggregate.count)
      setTodos(props.data.todos)

    } catch (error) {
      debugger;
    }
  }, [])

  // ------------------------------//------------------------------

  const toast = useToast()
  const iRef = useRef<any>({})
  const [invalidFields, setInvalidFields] = useState<any>({
    title: false,
  })

  const [removingId, setRemovingId] = useState()
  const [updatingId, setUpdatingId] = useState<any>()

  // networkStatus = ?,
  // const { data, loading, error, networkStatus, fetchMore, } = useGetTodosWithFetchMoreQuery({
  //   onError: (err) => {
  //     console.log(err)
  //   },
  //   variables: { start: 0, limit: 2, },
  //   onCompleted: (data: any) => {
  //     debugger;
  //     const gdata = [...todos, ...data.todos || []]
  //     const gDataWithSelectProps = gdata.map((g) => {
  //       return { ...g, selected: false, }
  //     })

  //     setTodos(gDataWithSelectProps)
  //     setTodoCount(data.todosConnection?.aggregate?.count || 0)
  //   }
  // })

  const [create, createVars] = useCreateTodoMutation();
  const [del, delVars] = useDeleteTodoMutation();
  const [update, updateVars] = useUpdateTodoMutation();

  const validateInvalid = (e: any) => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const frm = e.target;
    let invalid = { ...invalidFields };

    invalid = {
      ...invalid, title: (frm.title.value.length > 0 ||
        frm.title.value.length > 20 ||
        format.test(frm.title.value)
        ? false : true)
    }

    // Validate length > 20 chars    
    if (frm.title.value.length > 20) {
      showToast('Exceeding the maximum allowable length', 'error')
      return true;
    }
    // Validate spectial charater    
    if (format.test(frm.title.value)) {
      showToast('Special characters not allowed', 'error')
      return true;
    }

    setInvalidFields(invalid)

    const keys = Object.keys(invalid);
    const found = keys.some((s: string) => {
      return invalid[s] === true;
    });
    return found;
  }

  const formSubmit = async (e: any) => {
    e.preventDefault();

    if (validateInvalid(e)) {
      // invalid found
    } else {
      // Mutate .....      
      try {
        const res = await create({
          variables: {
            todo: {
              title: iRef.current['title'].value,
              finished: false,
            }
          }
        })

        setTodos((prev: any) => {
          return [{ ...res.data?.createTodo?.todo, selected: false, }, ...prev]
        })
        setTodoCount(todoCount + 1)

        iRef.current['title'].value = '';

      } catch (error) {
        debugger;
      }
    }
  }

  const showToast = (msg: string, status: string = 'success') => {
    toast({
      // title: msg,
      status: 'success',
      position: 'top-right',
      isClosable: true,
      render: function RenderToast() {
        return (
          <Flex direction="row"
            color="white"
            p="5px" bg={status === 'success' ? 'green.500' : 'red'} rounded="md" alignItems="center" >
            <CheckCircleIcon mx="5px" fontSize="18px" />
            <p style={{ color: 'white', marginLeft: '5px', fontSize: '18px' }}>{msg}</p>
          </Flex>
        )
      }

    })
  }

  if (todos.length === 0 && fetchVars.loading) {
    return (<MySkeleton />)
  }

  if (fetchVars.error) {
    return (<Alert status="error">
      <AlertIcon />
      <AlertDescription>{fetchVars.error}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>)
  }

  return (
    <Layout>
      <Flex align="center" direction="column" w="100%" >

        <VStack spacing={5} w="100%"  >

          {/* <Button onClick={(e) => {
            e.preventDefault();
            try {
              fetch({
                variables: { limit: 2, start: todos.length },
              })
            } catch (error) {
              debugger;
            }
          }
          }>LoadMore....</Button> */}

          <form onSubmit={formSubmit} style={{ width: '99%', }} >

            <FormControl isInvalid={invalidFields.title}>
              <label>
                <HStack align="center" >
                  <Input name="title" size="md" rounded="none" placeholder="Enter todo here" defaultValue="" ref={el => iRef.current['title'] = el} />

                  <div style={{ marginLeft: 0, lineHeight: 0, }}>
                    <Button rounded="none" size="md" variant="outline" type="submit" >
                      {createVars.loading ? 'saving' : 'save'}
                    </Button>
                  </div>

                </HStack>
              </label>
            </FormControl>

          </form>

          <Box boxShadow="lg" px="6" pb="4" rounded="md" bg="white" width="100%">
            <ul style={{ width: '100%', }}>
              <li> total {todoCount}</li>
              <li>
                <Flex direction="row" justify="space-between">
                  <Checkbox size="lg" onChange={(e) => {
                    e.preventDefault();
                    const isChecked = e.target.checked
                    setTodos((prev: any) => {
                      const data = [...prev];
                      return data.map((t) => {
                        return { ...t, selected: isChecked, }
                      })
                    })
                  }} >
                    <span>Select all</span>
                  </Checkbox>

                  <HStack>
                    <Button size="sm" onClick={() => {
                      // TODO remove all selected
                    }}>
                      removes
                    </Button>

                    <Button size="sm" onClick={async () => {

                      const selected = todos.filter((t: any) => t.selected)
                      showToast(`Updating ${selected.length} selected todos - Please wait!`)

                      try {
                        todos.forEach(async (td: any) => {
                          if (!td.selected) return;
                          const result = await update({
                            variables: {
                              Todo: { finished: !td.finished },
                              id: td.id,
                            },
                          })
                          console.log(result)
                          showToast(`${td.title} - updated`)
                        });
                      } catch (error) {
                        debugger;

                      }

                      // update ui
                      setTodos((prev: any) => {
                        const data = [...prev]
                        const newData = data.map((x: any) => {
                          if (x.selected) {
                            return { ...x, finished: !x.finished, }
                          }
                          return { ...x }
                        })
                        return newData;
                      })

                    }} > toggle archives </Button>

                  </HStack>

                </Flex>


              </li>
              {todos.map((t: any) => {
                const dist = formatDistance(
                  new Date(t.updatedAt),
                  new Date(),
                  { includeSeconds: true }
                )

                return (
                  <li key={t.id}>

                    <Flex direction="row">
                      <Checkbox isChecked={t.selected ? true : false} w="30px" size="lg" mr="1rem"
                        onChange={(e) => {
                          setTodos((prev: any) => {
                            const data = [...prev]
                            const newData = data.map((x) => {
                              if (x.id === t.id) {
                                return { ...x, selected: e.target.checked }
                              }
                              return { ...x }
                            })
                            return newData;
                          })
                        }} />

                      <Flex w="100%" justify="space-between" direction={{ base: "row", sm: "column", md: "row" }}>
                        <Box flexGrow={1}>
                          <div className={t.finished ? 'title todo-finished' : 'title'}>{t.title}</div>

                          <Badge borderRadius="full" px="2" colorScheme="teal">{dist}</Badge>
                        </Box>
                        <HStack w="150px">

                          <Button size="xs" variant="outline" colorScheme="purple" onClick={async () => {

                            setUpdatingId(t.id);

                            const result = await update({
                              variables: {
                                Todo: { finished: !t.finished },
                                id: t.id
                              }
                            })
                            setTodos((prev: any) => {
                              const data = [...prev];
                              const newData = data.map((x) => {
                                if (x.id === t.id) {
                                  return { ...x, finished: !x.finished, updatedAt: new Date(), }
                                }
                                return { ...x }
                              });
                              return newData;
                            })

                            setUpdatingId(-1)

                            // console.log('Updated!', result);
                            showToast(`${t.title} has been updated`)

                          }}> {updatingId === t.id ? 'archiving' : 'archive'} </Button>

                          <Button size="xs" variant="solid" colorScheme="red" onClick={async () => {
                            setRemovingId(t.id);
                            const res = await del({ variables: { id: t.id } });
                            setTodos((prev: any) => {
                              return prev.filter((t: any) => {
                                const id = res.data?.deleteTodo?.todo?.id;
                                return id !== t.id;
                              });
                            });
                            setTodoCount(todoCount - 1)
                            console.log(res.data?.deleteTodo?.todo?.id, 'deleted');

                          }}> {delVars.loading && removingId === t.id ? 'removing' : 'remove'} </Button>
                        </HStack>
                      </Flex>

                    </Flex>
                  </li>
                )
              })}

              <li>
                {todos.length < todoCount && (
                  <Button onClick={() => {
                    fetch({
                      variables: { limit: 2, start: todos.length }
                    })
                  }} >
                    {fetchVars.loading ? 'Loading ...' : 'Load more ... '}
                  </Button>
                )}

              </li>
            </ul>
          </Box>

        </VStack>

      </Flex>
    </Layout>
  )
}

// export async function getServerSideProps(context: any) {
//   debugger;
//   // const session = await getSession(context)
//   const jwt = await GraphQLLogin();
//   const response = (await GetTodosForHome()) || []

//   return {
//     props: {
//       graphQlConnection: { jwt, url: process.env.GRAPHQL_SCHEMA_BASE_URL, },
//       data: response, // TodoData
//     }
//   }
// }

export const getServerSideProps = withPageAuthRequired();

export default TodoApp;
