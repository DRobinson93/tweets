@extends('layouts.app')

@section('content')
    <div id="UserProfile"/>
    <div id="UserId" value="{{$userId}}"/>
    <div id="userOnPersonalPage" value="{{Auth::id() === $userId ? 1 : 0}}"/>
@endsection
