import graphene
from .resolvers import Query

# Defining the schema with typing
schema: graphene.Schema = graphene.Schema(query=Query)
